"""Tetris decision logic executed in the visitor's browser through Pyodide."""

import json

ROWS, COLS = 20, 10

W_LINES = 1.0
W_HOLES = -0.9
W_BUMP = -0.3
W_HEIGHT = -0.5

SHAPES = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1, 0], [1, 1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 1, 0], [0, 1, 1]],
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]],
]


def rotate_shape(shape):
    return [list(row)[::-1] for row in zip(*shape)]


def all_rotations(shape):
    rotations = []
    current = shape
    for _ in range(4):
        if current not in rotations:
            rotations.append(current)
        current = rotate_shape(current)
    return rotations


ROTATIONS = [all_rotations(shape) for shape in SHAPES]


def collision(board, shape, x, y):
    for row_index, row in enumerate(shape):
        for column_index, value in enumerate(row):
            if not value:
                continue
            board_x = x + column_index
            board_y = y + row_index
            if board_x < 0 or board_x >= COLS or board_y >= ROWS:
                return True
            if board_y >= 0 and board[board_y][board_x]:
                return True
    return False


def merge(board, shape, x, y, piece_index):
    result = [row[:] for row in board]
    for row_index, row in enumerate(shape):
        for column_index, value in enumerate(row):
            board_y = y + row_index
            board_x = x + column_index
            if value and board_y >= 0:
                result[board_y][board_x] = piece_index + 1
    return result


def clear_lines(board):
    remaining = [row for row in board if any(cell == 0 for cell in row)]
    cleared = ROWS - len(remaining)
    while len(remaining) < ROWS:
        remaining.insert(0, [0] * COLS)
    return remaining, cleared


def column_heights(board):
    heights = [0] * COLS
    for x in range(COLS):
        for y in range(ROWS):
            if board[y][x]:
                heights[x] = ROWS - y
                break
    return heights


def count_holes(board):
    total = 0
    for x in range(COLS):
        found_block = False
        for y in range(ROWS):
            if board[y][x]:
                found_block = True
            elif found_block:
                total += 1
    return total


def evaluate(board, cleared_lines):
    heights = column_heights(board)
    aggregate_height = sum(heights)
    bumpiness = sum(abs(heights[i] - heights[i + 1]) for i in range(COLS - 1))
    return (
        W_LINES * cleared_lines
        + W_HOLES * count_holes(board)
        + W_BUMP * bumpiness
        + W_HEIGHT * aggregate_height
    )


def hard_drop_y(board, shape, x, starting_y=-2):
    y = starting_y
    while not collision(board, shape, x, y + 1):
        y += 1
    return y


def best_move(board, piece_index):
    best = None
    for rotation_index, shape in enumerate(ROTATIONS[piece_index]):
        for x in range(-2, COLS):
            if collision(board, shape, x, 0):
                continue
            y = hard_drop_y(board, shape, x)
            candidate = merge(board, shape, x, y, piece_index)
            candidate, lines = clear_lines(candidate)
            score = evaluate(candidate, lines)
            if best is None or score > best["evaluation"]:
                best = {
                    "rotation": rotation_index,
                    "x": x,
                    "y": y,
                    "evaluation": score,
                }
    return best


def best_move_json(board_json, piece_index):
    """JavaScript-friendly entry point."""
    board = json.loads(board_json)
    result = best_move(board, int(piece_index))
    return json.dumps(result)
