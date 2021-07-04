class Deck{
  constructor(){
    this.deck = [];
  }

  add_cards(){
    this.reset();
    this.shuffle();
  }

  reset(){
    this.deck = [];

    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const names = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K'];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push( {value: values[value], name: names[value], suit: suits[suit]} );
      }
    }
  }

  shuffle(){
    const { deck } = this;
    let m = deck.length, i;

    while(m){
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return this;
  }

  deal(){
    return this.deck.pop();
  }

  draw(card) {
	this.deck.push(card);
  }
};

export default Deck;