export const denominationMapper = (coin) => {
    switch (coin) {
        case 50:
            return 'cincuenta';
        case 100:
            return 'cien';
        case 200:
            return 'doscientos';
        case 500:
            return 'quinientos';
        case 1000:
            return 'mil';
    }
}