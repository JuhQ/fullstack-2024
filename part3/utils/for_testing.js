const reverse = (string) => string.split('').reverse().join('');

const sort = (lista) => [...lista].sort((a, b) => a - b);

const average = (taulukko) => {
  if (!taulukko.length) {
    return 0;
  }

  const reducer = (summa, arvo) => summa + arvo;

  return taulukko.reduce(reducer, 0) / taulukko.length;
};

module.exports = {
  reverse, sort, average,
};
