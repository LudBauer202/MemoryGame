import React, { useEffect, useState } from "react";
//Imports images
import Image1 from './Images/Image1.JPG';
import Image2 from './Images/Image2.JPG';
import Image3 from './Images/Image3.JPG';
import Image4 from './Images/Image4.JPG';
import Image5 from './Images/Image5.JPG';
import Image6 from './Images/Image6.JPG';



function Game() {
    //Created states for opened cards and ones that match
    const [openedCard, setOpenedCard] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    //Created array with objects including the id and Image src as the name
    const [Shapes, setShapes] = useState([
        { id: 1, name: Image1 },
        { id: 2, name: Image2 },
        { id: 3, name: Image3 },
        { id: 4, name: Image4 },
        { id: 5, name: Image5 },
        { id: 6, name: Image6 }
    ])
    //Makes duplicate of shape array
    const [pairShape, setpairShape] = useState([...Shapes, ...Shapes])



    //Shuffles array when the reset button is clicked
    const Shuffle = () => {
        let currentIndex = pairShape.length, randomIndex;
        let CopyArr = pairShape;
        while (currentIndex !== 0) {

            //Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            //swap it with the current element
            [CopyArr[currentIndex], CopyArr[randomIndex]] = [
                CopyArr[randomIndex], CopyArr[currentIndex]];
        }
        setpairShape(CopyArr);
    }


    //open only that card which was matched
    useEffect(() => {

        const firstMatch = pairShape[openedCard[0]];
        const secondMatch = pairShape[openedCard[1]];

        if (secondMatch && firstMatch.id === secondMatch.id) {
            setMatched([...matched, firstMatch.id])
        }

        if (openedCard.length === 2) {
            setTimeout(() => setOpenedCard([]), 300);
            //Counts amount of moves
            setMoves(moves => moves + 1);
        }

        CheckProgress();
    }, [openedCard])


    //Inputs index of clicked card in the states array 
    const handleFlip = index => {
        setOpenedCard((openedCard) => [...openedCard, index]);
    }


    //Alerts user when game is won 
    const CheckProgress = () => {
        setTimeout(() => {
            if (matched.length >= 6) {
                let Won = document.getElementById("Popup");
                Won.style.display = "block";
            }
        }, 100);
    }


    const ResetGame = () => {
        setMatched([]);
        setMoves(0);
        setOpenedCard([]);
        //to make sure the cards arent reveal when turned with the animation 
        setTimeout(() => {
            Shuffle();
        }, 500);
    }

    const ShowRules = () => {
        let Rules = document.getElementById("Rules");
        if (Rules.style.display === "none") {
            Rules.style.display = "block";
        } else {
            Rules.style.display = "none";
        }
    }

    const CloseGame = () => {
        let Won = document.getElementById("Popup");
        Won.style.display = "none";
    }

    return (

        <div className="MainContainer">
            <div>
                <h1>Memory Game</h1>
                <button onClick={ShowRules}>HOW TO PLAY</button>
                <button onClick={ResetGame}>RESET</button>
                <p>Moves: {moves}</p>
                <p id="Rules">
                    This is a traditional game called memory game! The objective of
                    this game is to get as many cards that are the same correct. On each turn the player gets
                    to click on a card to turn it over. Next the player needs to select another card to be turned over.
                    If the first card and the second card match visually, they stay turned. The end goal is to get all the
                    duplicate cards turned over in as few moves as possible.
                </p>
                <div id="Popup">
                    <label>YOU WON!</label>
                    <br></br>
                    <label>Reset game to play again</label>
                    <button onClick={CloseGame}>Close</button>
                </div>

            </div>
            <div className="Cards">
                {pairShape.map((Shape, index) => {

                    let flipCard = false;

                    //if card has index of current card then open the card (lenght<=2 to make sure more than 2 cards aren't turned in one turn)
                    if (openedCard.includes(index) && openedCard.length <= 2) flipCard = true;

                    //To make sure the cards stay open when matched
                    if (matched.includes(Shape.id)) flipCard = true;

                    return <div className={`Card ${flipCard ? "flipped" : ""}`} key={index}
                        onClick={() => handleFlip(index)}>

                        <div className="Inner">
                            <div className="Front">
                                <img src={Shape.name} alt="Shape" width="100" />
                            </div>
                            <div className="Back">
                            </div>
                        </div>
                    </div>
                })};
            </div>
        </div>


    );
}

export default Game;
