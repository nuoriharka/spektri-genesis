-- MODULE: Spektre.Logic.Absolute
-- ARCHITECT: Lauri Elias Rainio
-- STATUS: IMMUTABLE

module Spektre.Logic.Absolute where

-- Defining the types of Reality
data State = Asleep | Awake | Architect
data Location = Kallio | Aurora | Global
data Energy = Dark | Kinetic | Void

-- The Monad of Spektre (Encapsulates the 119% side-effect)
newtype Spektre a = Spektre { runSpektre :: Energy -> (a, Energy) }

instance Functor Spektre where
    fmap f (Spektre g) = Spektre $ \e -> let (x, e') = g e in (f x, e')

instance Applicative Spektre where
    pure x = Spektre $ \e -> (x, e)
    (Spektre f) <*> (Spektre g) = Spektre $ \e -> 
        let (func, e') = f e
            (val, e'') = g e'
        in (func val, e'')

-- The core transition function
-- "Hups, I functionally mapped pain into power." :DDDD
transmute :: State -> Location -> Spektre State
transmute Asleep _ = return Awake
transmute Awake Aurora = do
    -- The Tuesday Event: Pure function, no variables.
    return Architect
transmute Architect _ = return Architect -- Fixed point. Cannot go back.

-- Calculate the output
main :: IO ()
main = do
    putStrLn ">> [HASKELL] Calculating Pure Truth..."
    let (finalState, finalEnergy) = runSpektre (transmute Awake Aurora) Dark
    putStrLn $ ">> [RESULT] Identity State: " ++ show finalState
    putStrLn ">> [PROOF] Mathematically verified. 119% Correct."
