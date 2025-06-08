import random

# Card class
class Card:
    def __init__(self, rank, suit):
        self.rank = rank
        self.value = 10 if rank in ["J", "Q", "K"] else 11 if rank == "A" else int(rank)

# Deck class
class Deck:
    suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
    ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

    def __init__(self):
        self.cards = [Card(rank, suit) for suit in self.suits for rank in self.ranks]
        random.shuffle(self.cards)

    def deal(self):
        return self.cards.pop()

# Player class
class Player:
    def __init__(self, name):
        self.name = name
        self.hand = []

    def add_card(self, card):
        self.hand.append(card)

    def score(self):
        total = sum(card.value for card in self.hand)
        aces = sum(1 for card in self.hand if card.rank == "A")
        while total > 21 and aces:
            total -= 10
            aces -= 1
        return total

# Game class
class Blackjack:
    def __init__(self, player_name):
        self.deck = Deck()
        self.player = Player(player_name)
        self.dealer = Player("Dealer")

    def play(self):
        # Deal initial cards
        for _ in range(2):
            self.player.add_card(self.deck.deal())
            self.dealer.add_card(self.deck.deal())

        # Player's turn
        while (score := self.player.score()) < 21:
            print(f"Your hand: {[card.rank for card in self.player.hand]}, Score: {score}")
            action = input("Hit or Stand? ").lower()
            if action == "hit":
                self.player.add_card(self.deck.deal())
            elif action == "stand":
                break

        # Dealer's turn
        while self.dealer.score() < 17:
            self.dealer.add_card(self.deck.deal())

        # Final score
        print(f"Your hand: {[card.rank for card in self.player.hand]}, Score: {self.player.score()}")
        print(f"Dealer's hand: {[card.rank for card in self.dealer.hand]}, Score: {self.dealer.score()}")

        # Determine winner
        if self.player.score() > 21:
            print("You busted! Dealer wins.")
        elif self.dealer.score() > 21 or self.player.score() > self.dealer.score():
            print("You win!")
        elif self.player.score() == self.dealer.score():
            print("It's a tie!")
        else:
            print("Dealer wins!")

# Play the game
if __name__ == "__main__":
    name = input("Enter your name: ")
    game = Blackjack(name)
    game.play()
