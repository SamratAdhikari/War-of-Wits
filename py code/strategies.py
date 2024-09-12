import random

friedchoice = True


def getJoss(oppChoice: bool):
	'''
	mimics the prev choice of the opp but defects 10% of the time
	'''
	if oppChoice:
		return False if random.random() < 0.1 else True
	return False


def getFriedman(oppChoice: bool):
	'''
	returns false if the opp chooses false even once
	'''
	global friedchoice

	if not oppChoice:
		friedchoice = False

	return friedchoice


def getTwoChances(oppChoice1: bool, oppChoice2: bool):
	'''
	returns false for every two false's in a row
	'''
	if (not oppChoice1) and (not oppChoice2):
		return False
	return True


def getRandom():
	'''
	returns true or false randomly
	'''
	return random.choice([True, False])


def getTitForTat(oppChoice: bool):
	'''
	mimics the prev choice of the opp
	'''
	return oppChoice


def getPoints(player1: bool, player2: bool):

	# Scoring based on the payoff matrix
	# count1, count2

	if player1 and player2:
		x, y =  3, 3

	elif player1 and not player2:
	    x, y = 0, 5

	elif not player1 and player2:
	    x, y =  5, 0

	else:
		x, y = 1, 1

	return x, y


if __name__ == '__main__':
	pass

