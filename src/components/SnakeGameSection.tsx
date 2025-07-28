"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SNAKE_GAME_CONFIG } from "@/lib/constants";
import {
    Play,
    Pause,
    RotateCcw,
    Trophy,
    Gamepad2,
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    Zap
} from "lucide-react";

interface Position {
    x: number;
    y: number;
}

interface GameState {
    snake: Position[];
    food: Position;
    direction: Position;
    gameOver: boolean;
    score: number;
    isPlaying: boolean;
    speed: number;
}

const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};

export default function SnakeGameSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    const { canvasWidth, canvasHeight, tileSize, initialSpeed, speedIncrement, minSpeed } = SNAKE_GAME_CONFIG;
    const gridWidth = canvasWidth / tileSize;
    const gridHeight = canvasHeight / tileSize;

    const [gameState, setGameState] = useState<GameState>(() => {
        const initialSnake = [{ x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) }];
        let initialFood: Position;
        do {
            initialFood = {
                x: Math.floor(Math.random() * gridWidth),
                y: Math.floor(Math.random() * gridHeight),
            };
        } while (initialSnake.some(segment => segment.x === initialFood.x && segment.y === initialFood.y));

        return {
            snake: initialSnake,
            food: initialFood,
            direction: DIRECTIONS.RIGHT,
            gameOver: false,
            score: 0,
            isPlaying: false,
            speed: initialSpeed,
        };
    });

    const [highScore, setHighScore] = useState(0);

    // Load high score from localStorage on mount
    useEffect(() => {
        const savedHighScore = localStorage.getItem("snake-high-score");
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore));
        }
    }, []);

    // Generate random food position that doesn't overlap with snake
    const generateFood = useCallback((snake: Position[]): Position => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * gridWidth),
                y: Math.floor(Math.random() * gridHeight),
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }, [gridWidth, gridHeight]);

    // Wrap position to create infinite canvas
    const wrapPosition = useCallback((pos: Position): Position => {
        return {
            x: ((pos.x % gridWidth) + gridWidth) % gridWidth,
            y: ((pos.y % gridHeight) + gridHeight) % gridHeight,
        };
    }, [gridWidth, gridHeight]);

    // Move snake and handle game logic
    const moveSnake = useCallback(() => {
        setGameState(prevState => {
            if (prevState.gameOver || !prevState.isPlaying) return prevState;

            const newSnake = [...prevState.snake];
            const head = { ...newSnake[0] };

            // Move head in current direction
            head.x += prevState.direction.x;
            head.y += prevState.direction.y;

            // Wrap around edges (infinite canvas)
            const wrappedHead = wrapPosition(head);
            newSnake.unshift(wrappedHead);

            // Check if food is eaten
            let newFood = prevState.food;
            let newScore = prevState.score;
            let newSpeed = prevState.speed;

            if (wrappedHead.x === prevState.food.x && wrappedHead.y === prevState.food.y) {
                // Food eaten - don't remove tail, generate new food, increase score and speed
                newFood = generateFood(newSnake);
                newScore = prevState.score + 10;
                newSpeed = Math.max(minSpeed, prevState.speed - speedIncrement);

                // Update high score if needed
                if (newScore > highScore) {
                    setHighScore(newScore);
                    localStorage.setItem("snake-high-score", newScore.toString());
                }
            } else {
                // No food eaten - remove tail
                newSnake.pop();
            }

            // Check collision with self
            const gameOver = newSnake.slice(1).some(segment =>
                segment.x === wrappedHead.x && segment.y === wrappedHead.y
            );

            return {
                ...prevState,
                snake: newSnake,
                food: newFood,
                score: newScore,
                speed: newSpeed,
                gameOver,
                isPlaying: !gameOver,
            };
        });
    }, [generateFood, wrapPosition, highScore, minSpeed, speedIncrement]);

    // Handle keyboard input
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        const { direction } = gameState;
        let newDirection = direction;

        switch (event.key) {
            case "ArrowUp":
            case "w":
            case "W":
                if (direction.y !== 1) newDirection = DIRECTIONS.UP;
                break;
            case "ArrowDown":
            case "s":
            case "S":
                if (direction.y !== -1) newDirection = DIRECTIONS.DOWN;
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                if (direction.x !== 1) newDirection = DIRECTIONS.LEFT;
                break;
            case "ArrowRight":
            case "d":
            case "D":
                if (direction.x !== -1) newDirection = DIRECTIONS.RIGHT;
                break;
            case " ":
                event.preventDefault();
                if (gameState.gameOver) {
                    resetGame();
                    setTimeout(() => setGameState(prev => ({ ...prev, isPlaying: true })), 100);
                } else if (gameState.isPlaying) {
                    pauseGame();
                } else {
                    startGame();
                }
                return;
        }

        if (newDirection !== direction && !gameState.gameOver) {
            setGameState(prev => ({ ...prev, direction: newDirection }));
        }
    }, [gameState.direction, gameState.gameOver, gameState.isPlaying]);

    // Game loop
    useEffect(() => {
        if (gameState.isPlaying && !gameState.gameOver) {
            gameLoopRef.current = setTimeout(moveSnake, gameState.speed);
        }
        return () => {
            if (gameLoopRef.current) {
                clearTimeout(gameLoopRef.current);
            }
        };
    }, [gameState.isPlaying, gameState.gameOver, gameState.speed, moveSnake]);

    // Keyboard event listeners
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    // Canvas rendering
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw snake as circles
        gameState.snake.forEach((segment, index) => {
            const centerX = segment.x * tileSize + tileSize / 2;
            const centerY = segment.y * tileSize + tileSize / 2;
            const radius = (tileSize / 2) - 2;

            // Create gradient for each segment
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, radius
            );

            if (index === 0) {
                // Head - brighter purple with glow
                gradient.addColorStop(0, "#e879f9");
                gradient.addColorStop(0.7, "#a855f7");
                gradient.addColorStop(1, "#7c3aed");
            } else {
                // Body - darker purple
                gradient.addColorStop(0, "#a855f7");
                gradient.addColorStop(0.7, "#8b5cf6");
                gradient.addColorStop(1, "#6d28d9");
            }

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();

            // Add a subtle border for better visibility
            ctx.strokeStyle = index === 0 ? "#f3e8ff" : "#ddd6fe";
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Draw food as a glowing circle
        const foodCenterX = gameState.food.x * tileSize + tileSize / 2;
        const foodCenterY = gameState.food.y * tileSize + tileSize / 2;
        const foodRadius = (tileSize / 2) - 3;

        // Food gradient - golden/orange
        const foodGradient = ctx.createRadialGradient(
            foodCenterX, foodCenterY, 0,
            foodCenterX, foodCenterY, foodRadius
        );
        foodGradient.addColorStop(0, "#fbbf24");
        foodGradient.addColorStop(0.7, "#f59e0b");
        foodGradient.addColorStop(1, "#d97706");

        ctx.fillStyle = foodGradient;
        ctx.beginPath();
        ctx.arc(foodCenterX, foodCenterY, foodRadius, 0, 2 * Math.PI);
        ctx.fill();

        // Add food border
        ctx.strokeStyle = "#fef3c7";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw subtle grid lines
        ctx.strokeStyle = "#1f1f1f";
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= gridWidth; x++) {
            ctx.beginPath();
            ctx.moveTo(x * tileSize, 0);
            ctx.lineTo(x * tileSize, canvasHeight);
            ctx.stroke();
        }
        for (let y = 0; y <= gridHeight; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * tileSize);
            ctx.lineTo(canvasWidth, y * tileSize);
            ctx.stroke();
        }
    }, [gameState, canvasWidth, canvasHeight, tileSize, gridWidth, gridHeight]);

    const startGame = () => {
        setGameState(prev => ({ ...prev, isPlaying: true }));
    };

    const pauseGame = () => {
        setGameState(prev => ({ ...prev, isPlaying: false }));
    };

    const resetGame = () => {
        const newSnake = [{ x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) }];
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * gridWidth),
                y: Math.floor(Math.random() * gridHeight),
            };
        } while (newSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));

        setGameState({
            snake: newSnake,
            food: newFood,
            direction: DIRECTIONS.RIGHT,
            gameOver: false,
            score: 0,
            isPlaying: false,
            speed: initialSpeed,
        });
    };

    return (
        <section id="snake-game" className="min-h-screen py-20 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gradient mb-4">Snake Game</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A classic game built with React and Canvas API. Test your skills and beat the high score!
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Game Canvas */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader className="text-center">
                                    <div className="flex items-center justify-center space-x-4 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Trophy className="w-5 h-5 text-yellow-400" />
                                            <span className="text-white font-semibold">Score: {gameState.score}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Zap className="w-5 h-5 text-purple-400" />
                                            <span className="text-white font-semibold">High: {highScore}</span>
                                        </div>
                                        {gameState.isPlaying && (
                                            <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                                                Speed: {((initialSpeed - gameState.speed) / speedIncrement + 1).toFixed(0)}x
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center space-y-6">
                                    {/* Canvas Container */}
                                    <div className="relative">
                                        <canvas
                                            ref={canvasRef}
                                            width={canvasWidth}
                                            height={canvasHeight}
                                            className="border-2 border-purple-500/30 rounded-lg bg-black shadow-2xl"
                                        />

                                        {/* Game Over Overlay */}
                                        {gameState.gameOver && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg"
                                            >
                                                <div className="text-center">
                                                    <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
                                                    <p className="text-gray-300 mb-4">Score: {gameState.score}</p>
                                                    {gameState.score === highScore && gameState.score > 0 && (
                                                        <p className="text-yellow-400 mb-4">🎉 New High Score!</p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Game Controls */}
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            onClick={() => {
                                                if (gameState.gameOver) {
                                                    resetGame();
                                                    setTimeout(() => startGame(), 100);
                                                } else if (gameState.isPlaying) {
                                                    pauseGame();
                                                } else {
                                                    startGame();
                                                }
                                            }}
                                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                        >
                                            {gameState.gameOver ? (
                                                <>
                                                    <RotateCcw className="w-4 h-4 mr-2" />
                                                    Restart
                                                </>
                                            ) : gameState.isPlaying ? (
                                                <>
                                                    <Pause className="w-4 h-4 mr-2" />
                                                    Pause
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="w-4 h-4 mr-2" />
                                                    Start
                                                </>
                                            )}
                                        </Button>

                                        <Button
                                            onClick={resetGame}
                                            variant="outline"
                                            className="border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
                                        >
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            Reset
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Game Instructions and Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            {/* Instructions */}
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-600/20 rounded-lg">
                                            <Gamepad2 className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">How to Play</h3>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex space-x-1">
                                                <ArrowUp className="w-4 h-4 text-purple-400" />
                                                <ArrowDown className="w-4 h-4 text-purple-400" />
                                                <ArrowLeft className="w-4 h-4 text-purple-400" />
                                                <ArrowRight className="w-4 h-4 text-purple-400" />
                                            </div>
                                            <span className="text-gray-300 text-sm">Arrow keys to move</span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <kbd className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">WASD</kbd>
                                            <span className="text-gray-300 text-sm">Alternative controls</span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <kbd className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">SPACE</kbd>
                                            <span className="text-gray-300 text-sm">Pause/Resume</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-700">
                                        <h4 className="text-purple-300 font-semibold mb-2">Game Features:</h4>
                                        <ul className="space-y-1 text-gray-400 text-sm">
                                            <li>• Infinite canvas - wrap around edges</li>
                                            <li>• Increasing speed with each food</li>
                                            <li>• Score tracking and high scores</li>
                                            <li>• Smooth animations and effects</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Game Stats */}
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <h3 className="text-xl font-bold text-white">Game Stats</h3>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Current Score:</span>
                                        <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                                            {gameState.score}
                                        </Badge>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">High Score:</span>
                                        <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">
                                            {highScore}
                                        </Badge>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Snake Length:</span>
                                        <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                                            {gameState.snake.length}
                                        </Badge>
                                    </div>

                                    {gameState.isPlaying && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Speed Level:</span>
                                            <Badge className="bg-red-600/20 text-red-300 border-red-500/30">
                                                {((initialSpeed - gameState.speed) / speedIncrement + 1).toFixed(0)}x
                                            </Badge>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Game Status */}
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardContent className="p-4 text-center">
                                    {gameState.gameOver ? (
                                        <div className="text-red-400">
                                            <Trophy className="w-8 h-8 mx-auto mb-2" />
                                            <p className="font-semibold">Game Over</p>
                                        </div>
                                    ) : gameState.isPlaying ? (
                                        <div className="text-green-400">
                                            <Play className="w-8 h-8 mx-auto mb-2" />
                                            <p className="font-semibold">Playing</p>
                                        </div>
                                    ) : (
                                        <div className="text-yellow-400">
                                            <Pause className="w-8 h-8 mx-auto mb-2" />
                                            <p className="font-semibold">Paused</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
