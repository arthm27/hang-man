import React, { useState, useEffect } from "react";
import HangmanCanvas from "./HangmanCanvas";
import "./HangmanGame.css";

const words = ["ARCADE", "HACKCLUB", "ZRL", "HANGMAN", "HOURS"];

const HangmanGame = () => {
    const [word, setWord] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [mistakes, setMistakes] = useState(0);

    useEffect(() => {
        resetGame();
    }, []);

    const chooseRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex].toUpperCase();
    };

    const handleGuess = (letter) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!word.includes(letter)) {
                setMistakes(mistakes + 1);
            }
        }
    };

    const isGameWon = () => {
        return word
            .split("")
            .every((letter) => guessedLetters.includes(letter));
    };

    const isGameLost = () => {
        return mistakes >= 6;
    };

    const resetGame = () => {
        setWord(chooseRandomWord());
        setGuessedLetters([]);
        setMistakes(0);
    };

    return (
        <div className="hangman-container">
            <h1>~ Hangman Game ~</h1>
            <h2>
                Guess the word !!!
            </h2>
            <HangmanCanvas mistakes={mistakes} />
            <div className="word-display">
                {word.split("").map((letter, index) => (
                    <span key={index} className="letter">
                        {guessedLetters.includes(letter) ? letter : "_"}
                    </span>
                ))}
            </div>
            <div className="keyboard">
                {Array.from(Array(26)).map((_, index) => (
                    <button
                        key={index}
                        onClick={() =>
                            handleGuess(String.fromCharCode(65 + index))
                        }
                        disabled={guessedLetters.includes(
                            String.fromCharCode(65 + index)
                        )}
                    >
                        {String.fromCharCode(65 + index)}
                    </button>
                ))}
            </div>
            {isGameWon() && <p className="result-message">You won!</p>}
            {isGameLost() && (
                <p className="result-message">You lost! The word was: {word}</p>
            )}
            <button className="new-game-button" onClick={resetGame}>
                New Game
            </button>
        </div>
    );
};

export default HangmanGame;
