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
    const newText = text.replace(',', '.');
    const lastDotIdx = newText.lastIndexOf('.');
    return this.deleteDotsUntilLast(newText, lastDotIdx);
  }

  private deleteDotsUntilLast(text: string, idx: number): number {
    let formattedText: string = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '.' && i !== idx) {
        continue;
      }
      formattedText += text[i];
    };
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

  format(obj: any, isoCode: string, currencyFormat: 'acronym' | 'symbol'): any {
    const propertyNames = Object.getOwnPropertyNames(obj);
    propertyNames.forEach(name => {
      obj[name] = DefaultFormatter.instance.format(obj[name]);
      if (name === 'price') {
        obj[name] = PriceFormatter.instance.format(obj[name]);
      } else if (name === 'currency') {
        obj[name] = CurrencyFormatter.instance.format(isoCode, currencyFormat);
      }
    });
    return obj;
  }
}