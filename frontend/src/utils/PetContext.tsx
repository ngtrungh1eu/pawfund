import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PetContextType {
    favorites: string[];
    toggleFavorite: (petId: string) => void;
    removeAllFavorites: () => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (petId: string) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(petId)) {
                return prevFavorites.filter((id) => id !== petId);
            } else {
                return [...prevFavorites, petId];
            }
        });
    };
    const removeAllFavorites = () => {
        setFavorites([]);
    };
    return (
        <PetContext.Provider
            value={{ favorites, toggleFavorite, removeAllFavorites }}
        >
            {children}
        </PetContext.Provider>
    );
};

export const usePetContext = (): PetContextType => {
    const context = useContext(PetContext);
    if (!context) {
        throw new Error('usePetContext must be used within a PetProvider');
    }
    return context;
};
