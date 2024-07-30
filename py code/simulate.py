import pygame
import random
from strategies import getJoss, getFriedman, getTwoChances, getRandom, getTitForTat, getPoints
import time

# Initialize Pygame
pygame.init()

# Constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 800
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
CELL_SIZE = 20
MARGIN = 5
FONT_SIZE = 30
TITLE_FONT_SIZE = 50
PAIR_GAP = 40

# Set up display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Prisoner's Dilemma")

# Fonts
title_font = pygame.font.SysFont(None, TITLE_FONT_SIZE)
font = pygame.font.SysFont(None, FONT_SIZE)

# Strategies
strategies = {
    "Joss": getJoss,
    "Friedman": getFriedman,
    "Two Chances": getTwoChances,
    "Random": getRandom,
    "Tit for Tat": getTitForTat
}

# Initial decisions (for simplicity, all start with cooperation)
initial_coop = True
decisions = {name: [initial_coop] for name in strategies}

# Function to get the next move for a strategy
def get_next_move(strategy, opponent_moves):
    if strategy == "Two Chances":
        if len(opponent_moves) < 2:
            return getTwoChances(opponent_moves[-1], initial_coop)
        else:
            return getTwoChances(opponent_moves[-1], opponent_moves[-2])
    elif strategy == "Random":
        return getRandom()
    else:
        return strategies[strategy](opponent_moves[-1])

# Main loop
running = True
clock = pygame.time.Clock()

# Number of iterations
iterations = 15

# Pairs of strategies to simulate
strategy_names = list(strategies.keys())
pairs = [(strategy_names[i], strategy_names[j]) for i in range(len(strategy_names)) for j in range(i + 1, len(strategy_names))]

# Start simulation
for _ in range(iterations):
    new_decisions = {name: [] for name in strategies}
    
    for strategy1, strategy2 in pairs:
        last_move1 = decisions[strategy1][-1]
        last_move2 = decisions[strategy2][-1]
        
        new_move1 = get_next_move(strategy1, decisions[strategy2])
        new_move2 = get_next_move(strategy2, decisions[strategy1])
        
        new_decisions[strategy1].append(new_move1)
        new_decisions[strategy2].append(new_move2)
        
    for name in strategies:
        decisions[name].append(new_decisions[name][-1])
        
    # Process events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Draw everything
    screen.fill(WHITE)
    
    # Draw title
    title_surface = title_font.render("War of Wits", True, BLACK)
    screen.blit(title_surface, ((SCREEN_WIDTH - title_surface.get_width()) // 2, 10))
    
    # Draw strategies
    max_visible_cells = (SCREEN_WIDTH - 200) // (CELL_SIZE + MARGIN)
    pair_y_offset = TITLE_FONT_SIZE + 60  # Starting y position for the pairs
    
    for pair_index, (strategy1, strategy2) in enumerate(pairs):
        pair_offset_y = pair_y_offset + pair_index * (CELL_SIZE * 2 + MARGIN * 2 + PAIR_GAP)
        
        if len(decisions[strategy1]) > max_visible_cells:
            offset = len(decisions[strategy1]) - max_visible_cells
        else:
            offset = 0
        
        # Draw strategy 1
        strategy1_surface = font.render(strategy1, True, BLACK)
        screen.blit(strategy1_surface, (10, pair_offset_y + (CELL_SIZE // 2)))
        for j, decision in enumerate(decisions[strategy1][offset:]):
            color = GREEN if decision else RED
            pygame.draw.rect(screen, color, (150 + j * (CELL_SIZE + MARGIN), pair_offset_y, CELL_SIZE, CELL_SIZE))
        
        # Draw strategy 2
        strategy2_surface = font.render(strategy2, True, BLACK)
        screen.blit(strategy2_surface, (10, pair_offset_y + CELL_SIZE + MARGIN + (CELL_SIZE // 2)))
        for j, decision in enumerate(decisions[strategy2][offset:]):
            color = GREEN if decision else RED
            pygame.draw.rect(screen, color, (150 + j * (CELL_SIZE + MARGIN), pair_offset_y + CELL_SIZE + MARGIN, CELL_SIZE, CELL_SIZE))
        
        # Draw separator line between pairs
        pygame.draw.line(screen, BLACK, (10, pair_offset_y + CELL_SIZE * 2 + MARGIN * 2), (SCREEN_WIDTH - 10, pair_offset_y + CELL_SIZE * 2 + MARGIN * 2), 2)
    
    pygame.display.flip()
    
    # Delay to visualize step-by-step
    time.sleep(0.5)

pygame.quit()
