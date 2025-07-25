"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Play,
    Pause,
    RotateCcw,
    Trophy,
    Zap,
    Home,
    Volume2,
    VolumeX
} from "lucide-react";

type Position = {
    x: number;
    y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION: Direction = 'RIGHT';
const GAME_SPEED = 150;

export default function SnakeGameSection() {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Position>(INITIAL_FOOD);
    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [speed, setSpeed] = useState(GAME_SPEED);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showGameOverDialog, setShowGameOverDialog] = useState(false);

    const gameRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Load high score from localStorage
    useEffect(() => {
        const savedHighScore = localStorage.getItem('snakeHighScore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore));
        }
    }, []);

    // Save high score to localStorage
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score.toString());
        }
    }, [score, highScore]);

    // Generate random food position
    const generateFood = useCallback((currentSnake: Position[]): Position => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }, []);

    // Move snake
    const moveSnake = useCallback(() => {
        setSnake(currentSnake => {
            const newSnake = [...currentSnake];
            const head = { ...newSnake[0] };

            // Move head based on direction
            switch (direction) {
                case 'UP':
                    head.y -= 1;
                    break;
                case 'DOWN':
                    head.y += 1;
                    break;
                case 'LEFT':
                    head.x -= 1;
                    break;
                case 'RIGHT':
                    head.x += 1;
                    break;
            }

            // Check wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true);
                setIsPlaying(false);
                setShowGameOverDialog(true);
                return currentSnake;
            }

            // Check self collision
            if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                setIsPlaying(false);
                setShowGameOverDialog(true);
                return currentSnake;
            }

            newSnake.unshift(head);

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                setScore(prev => prev + 10);
                setFood(generateFood(newSnake));

                // Increase speed slightly
                setSpeed(prev => Math.max(80, prev - 2));

                // Play eat sound (in real implementation)
                if (soundEnabled) {
                    // playEatSound();
                }
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, generateFood, soundEnabled]);

    // Game loop
    useEffect(() => {
        if (isPlaying && !gameOver) {
            intervalRef.current = setInterval(moveSnake, speed);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, gameOver, moveSnake, speed]);

    // Handle keyboard input
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isPlaying) return;

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
                    break;
                case ' ':
                    e.preventDefault();
                    toggleGame();
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    resetGame();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPlaying]);

    const toggleGame = () => {
        if (gameOver) {
            resetGame();
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(INITIAL_FOOD);
        setDirection(INITIAL_DIRECTION);
        setIsPlaying(false);
        setGameOver(false);
        setScore(0);
        setSpeed(GAME_SPEED);
        setShowGameOverDialog(false);
    };

    const getDifficultyLevel = () => {
        if (score >= 200) return { name: "Insane", color: "text-red-400" };
        if (score >= 150) return { name: "Expert", color: "text-orange-400" };
        if (score >= 100) return { name: "Hard", color: "text-yellow-400" };
        if (score >= 50) return { name: "Medium", color: "text-blue-400" };
        return { name: "Easy", color: "text-green-400" };
    };

    const difficulty = getDifficultyLevel();

    return (
        <section id="snake-game" className="min-h-screen py-20 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-4xl font-bold text-gradient mb-4">Snake Game</h2>
                    <p className="text-gray-400 text-lg">Classic snake game with a modern twist</p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Game Board */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">Game Board</h3>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSoundEnabled(!soundEnabled)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    const element = document.querySelector("#hero");
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: "smooth" });
                                                    }
                                                }}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <Home className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* Game Grid */}
                                    <div
                                        ref={gameRef}
                                        className="relative bg-black border-2 border-purple-500/30 rounded-lg p-2 mx-auto"
                                        style={{
                                            width: `${GRID_SIZE * 20}px`,
                                            height: `${GRID_SIZE * 20}px`
                                        }}
                                        tabIndex={0}
                                    >
                                        {/* Grid cells */}
                                        <div className="absolute inset-2 grid grid-cols-20 gap-px">
                                            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                                                const x = index % GRID_SIZE;
                                                const y = Math.floor(index / GRID_SIZE);

                                                const isSnakeSegment = snake.some(segment => segment.x === x && segment.y === y);
                                                const isHead = snake[0]?.x === x && snake[0]?.y === y;
                                                const isFood = food.x === x && food.y === y;

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`
                              w-4 h-4 rounded-sm transition-all duration-100
                              ${isHead ? 'bg-purple-400 shadow-lg shadow-purple-400/50' : ''}
                              ${isSnakeSegment && !isHead ? 'bg-purple-600' : ''}
                              ${isFood ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse' : ''}
                              ${!isSnakeSegment && !isFood ? 'bg-gray-900/30' : ''}
                            `}
                                                    >
                                                        {isFood && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="w-full h-full bg-red-500 rounded-full"
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Game Over Overlay */}
                                        <AnimatePresence>
                                            {gameOver && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg"
                                                >
                                                    <div className="text-center">
                                                        <h4 className="text-2xl font-bold text-red-400 mb-2">Game Over!</h4>
                                                        <p className="text-gray-300 mb-4">Final Score: {score}</p>
                                                        <Button
                                                            onClick={resetGame}
                                                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                                        >
                                                            <RotateCcw className="w-4 h-4 mr-2" />
                                                            Play Again
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Controls */}
                                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                                        <Button
                                            onClick={toggleGame}
                                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                        >
                                            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                                            {gameOver ? 'New Game' : isPlaying ? 'Pause' : 'Start'}
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

                                    {/* Instructions */}
                                    <div className="mt-6 text-center text-sm text-gray-400">
                                        <p>Use arrow keys or WASD to move • Space to pause • R to reset</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            {/* Score */}
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <h3 className="text-lg font-bold text-white flex items-center">
                                        <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                                        Score
                                    </h3>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-400">Current</span>
                                            <motion.span
                                                key={score}
                                                initial={{ scale: 1.2, color: "#a855f7" }}
                                                animate={{ scale: 1, color: "#ffffff" }}
                                                className="text-2xl font-bold text-white"
                                            >
                                                {score}
                                            </motion.span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Best</span>
                                            <span className="text-xl font-bold text-yellow-400">{highScore}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-700">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Level</span>
                                            <Badge className={`${difficulty.color} bg-transparent border-current`}>
                                                {difficulty.name}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats */}
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <h3 className="text-lg font-bold text-white flex items-center">
                                        <Zap className="w-5 h-5 mr-2 text-purple-400" />
                                        Stats
                                    </h3>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Length</span>
                                        <span className="text-white font-semibold">{snake.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Food Eaten</span>
                                        <span className="text-white font-semibold">{Math.floor(score / 10)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Speed</span>
                                        <span className="text-white font-semibold">{Math.round((GAME_SPEED - speed) / 10) + 1}x</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Instructions */}
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <h3 className="text-lg font-bold text-white">How to Play</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 text-sm text-gray-300">
                                        <div>• Use arrow keys or WASD to control the snake</div>
                                        <div>• Eat the red food to grow and score points</div>
                                        <div>• Avoid hitting walls and yourself</div>
                                        <div>• Speed increases as you score more</div>
                                        <div>• Press Space to pause/resume</div>
                                        <div>• Press R to reset the game</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* Game Over Dialog */}
                <Dialog open={showGameOverDialog} onOpenChange={setShowGameOverDialog}>
                    <DialogContent className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                        <DialogHeader>
                            <DialogTitle className="text-2xl text-center text-white">
                                {score > highScore ? "New High Score! 🎉" : "Game Over!"}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="text-center space-y-4">
                            <div className="text-4xl font-bold text-purple-400">{score}</div>
                            <p className="text-gray-300">
                                {score > highScore
                                    ? "Congratulations! You've set a new personal best!"
                                    : `You were ${highScore - score} points away from your best score.`
                                }
                            </p>
                            <div className="flex gap-3 justify-center">
                                <Button
                                    onClick={() => {
                                        resetGame();
                                        setIsPlaying(true);
                                    }}
                                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                >
                                    <Play className="w-4 h-4 mr-2" />
                                    Play Again
                                </Button>
                                <Button
                                    onClick={() => setShowGameOverDialog(false)}
                                    variant="outline"
                                    className="border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
