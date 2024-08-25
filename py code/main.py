import random
import math
from strategies import getTitForTat, getPoints, getRandom, getTwoChances, getFriedman, getJoss

def simulate():
	player1 = []
	player2 = []

	# points count
	points1 = 0
	points2 = 0

	player1.append(True)
	player2.append(getRandom())

	print('Player1', player1[0], end='\t')
	print('Random', player2[0])

	for i in range(1, 20):
		# choice1 = getTitForTat(player2[i-1])
		# choice1 = getTwoChances(player2[i-1], player2[-2] if len(player2) >= 2 else True)
		# choice1 = getFriedman(player2.filter())
		# choice1 = getFriedman( next((x for x in player2 if not x), True) )

		# choice1 = getJoss(player2[i-1])

		choice1 = getFriedman(player2[i-1])
		choice2 = getRandom()

		player1.append(choice1)
		player2.append(choice2)

		x, y = getPoints(choice1, choice2)
		points1 += x
		points2 += y

		print('Player1', choice1, end='\t')
		print('Random', choice2)




	print('Player1 score:', points1)
	print('Player2 score:', points2)

if __name__ == '__main__':
	simulate()

