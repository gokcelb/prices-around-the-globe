interface Formatter {
  format(text?: string, country?:string, currencyFormat?: string): any;
}

export class DefaultFormatter implements Formatter {
  format(text: string): string {
    return text.trim();
  }
}

export class PriceFormatter implements Formatter {
  format(text: string): number {
    const newText = text.replace(',', '.');
    const lastDotIdx = newText.lastIndexOf('.');
    return this.deleteDotsUntilLast(newText, lastDotIdx);
  }

  deleteDotsUntilLast(text:string, idx: number): number {
    let formattedText: string = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '.' && i !== idx) {
        continue;
      } else {
        formattedText += text[i];
      }
    };
    return parseFloat(formattedText);
  }
}

export class CurrencyFormatter implements Formatter {
  protected currencyDict: { [key: string]: { [key: string]: string } } = {
    'tr': {'symbol': '₺', 'acronym': 'TRY'},
    'us': {'symbol': '$', 'acronym': 'USD'},
    'lu': {'symbol': '€', 'acronym': 'EUR'},
  }

  format(isoCode:string, currencyFormat: string): string {
    return this.currencyDict[isoCode][currencyFormat];
  }
}

// format(tr, symbol) => this.currency[tr][symbol] = ₺

// 40,300.53 USA
// 25.250,03 EUR