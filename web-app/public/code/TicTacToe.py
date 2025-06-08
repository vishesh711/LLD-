import random

class Board:
    def __init__(self):
        self.grid = [[" " for _ in range(3)] for _ in range(3)]

    def display(self):
        for row in self.grid:
            print("|".join(row))
            print("-" * 5)

    def make_move(self, row, col, symbol):
        if 0 <= row < 3 and 0 <= col < 3 and self.grid[row][col] == " ":
            self.grid[row][col] = symbol
            return True
        return False

    def is_winner(self, symbol):
        for i in range(3):
            if all(self.grid[i][j] == symbol for j in range(3)):  # Check rows
                return True
            if all(self.grid[j][i] == symbol for j in range(3)):  # Check columns
                return True
        if all(self.grid[i][i] == symbol for i in range(3)):  # Check main diagonal
            return True
        if all(self.grid[i][2 - i] == symbol for i in range(3)):  # Check opposite diagonal
            return True
        return False

    def is_full(self):
        return all(cell != " " for row in self.grid for cell in row)


class Player:
    def __init__(self, symbol):
        self.symbol = symbol

    def get_move(self):
        while True:
            move = input(f"Enter row and col (0-2) for {self.symbol}: ").split()
            if len(move) == 2 and all(x.isdigit() for x in move):
                row, col = map(int, move)
                if 0 <= row < 3 and 0 <= col < 3:
                    return row, col
            print("Invalid input! Enter two numbers between 0-2.")


class Game:
    def __init__(self):
        self.board = Board()
        self.players = [Player("X"), Player("O")]
        self.current_player = random.choice(self.players)

    def switch_turn(self):
        self.current_player = self.players[0] if self.current_player == self.players[1] else self.players[1]

    def play(self):
        while True:
            self.board.display()
            row, col = self.current_player.get_move()

            if self.board.make_move(row, col, self.current_player.symbol):
                if self.board.is_winner(self.current_player.symbol):
                    self.board.display()
                    print(f"🎉 Player {self.current_player.symbol} wins!")
                    break
                if self.board.is_full():
                    self.board.display()
                    print("It's a draw!")
                    break
                self.switch_turn()
            else:
                print("Invalid move, try again!")


if __name__ == "__main__":
    Game().play()
