export class FormatterFactory {
  static get(formatter?: string): Formatter {
    if (formatter === 'currency') {
      return CurrencyFormatter.instance;
    } else if (formatter === 'price') {
      return PriceFormatter.instance;
    } else if (formatter === 'object') {
      return ObjectFormatter.instance;
    }
    return DefaultFormatter.instance;
  }
}

interface Formatter {
  format(...info: any[]): any;
}

export class DefaultFormatter implements Formatter {
  private static _instance: DefaultFormatter;

  private constructor() { }

  static get instance(): DefaultFormatter {
    if (!this._instance) {
      this._instance = new DefaultFormatter();
    }
    return this._instance;
  }

  format(text: string): string {
    return text.trim();
  }
}

export class PriceFormatter implements Formatter {
  private static _instance: PriceFormatter;

  private constructor() { }

  static get instance(): PriceFormatter {
    if (!this._instance) {
      this._instance = new PriceFormatter();
    }
    return this._instance;
  }

  format(text: string): number {
    if (this.containsNumber(text) === false) return -1;

    const newText = text.replace(',', '.');
    const lastDotIdx = newText.lastIndexOf('.');
    return this.deleteUnnecessary(newText, lastDotIdx);
  }

  private containsNumber(text: string): boolean {
    const numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    for (let i = 0; i < text.length; i++) {
      if (numbers.includes(text[i])) {
        return true;
      }
    }
    return false;
  }

  private deleteUnnecessary(text: string, idx: number): number {
    let newText = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== '.' && (text[i].charCodeAt(0) < 48 || text[i].charCodeAt(0) > 57)) {
        continue;
      }
      newText += text[i];
    }

    let dotCount = 0;
    for (let i = 0; i < newText.length; i++) {
      if (newText[i] === '.') {
        dotCount++;
      }
    } 

    let formattedText: string = '';
    for (let i = 0; i < newText.length; i++) {
      if ((dotCount > 1 && newText[i] === '.' && i !== idx) || (dotCount <= 1 && newText[i] === '.')) {
        continue;
      }
      formattedText += newText[i];
    }
    return parseFloat(formattedText);
  }
}

interface CurrencyFormat {
  symbol: string;
  acronym: string;
}

export class CurrencyFormatter implements Formatter {
  private static _instance: CurrencyFormatter;

  protected currencyDict: Map<String, CurrencyFormat> = new Map([
    ['TR', { symbol: '₺', acronym: 'TRY' }],
    ['US', { symbol: '$', acronym: 'USD' }],
    ['LU', { symbol: '€', acronym: 'EUR' }],
  ]);

  private constructor() { }

  static get instance(): CurrencyFormatter {
    if (!this._instance) {
      this._instance = new CurrencyFormatter();
    }
    return this._instance;
  }

  format(isoCode: string, currencyFormat: 'symbol' | 'acronym' = 'symbol'): string {
    const format = this.currencyDict.get(isoCode.toUpperCase());
    if (format) {
      return format[currencyFormat];
    }
    return '';
  }
}

export class ObjectFormatter implements Formatter {
  private static _instance: ObjectFormatter;

  private constructor() { }

  static get instance(): ObjectFormatter {
    if (!this._instance) {
      this._instance = new ObjectFormatter();
    }
    return this._instance;
  }

  format(obj: any, isoCode: string, currencyFormat: 'acronym' | 'symbol', category: string): any {
    const propertyNames = Object.getOwnPropertyNames(obj);

    for(let i=0; i<propertyNames.length; i++) {
      const name = propertyNames[i];
      obj[name] = DefaultFormatter.instance.format(obj[name]);
      if (name === 'price') {
        obj[name] = PriceFormatter.instance.format(obj[name]);
        if (obj[name] === -1) {
          return {};
        }
      }
      if (name === 'mileage') {
        obj[name] = PriceFormatter.instance.format(obj[name]);
      }
      if (!obj['currency']) {
        obj['currency'] = CurrencyFormatter.instance.format(isoCode, currencyFormat);
      }
      if (!obj['category']) {
        obj['category'] = category;
      }
    }
    return obj;
  }
}