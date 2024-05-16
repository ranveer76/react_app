import React, { useContext, useEffect, useState } from 'react';
import ThemeTemplateData from '../../db/ThemeTemplateData';
import ResumeContext from '../../Context/ResumeContext';
import { Box, useColorModeValue, chakra } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ContextMenu from './ContextMenu'; // Adjust the import path as necessary
import { remove, getDatabase, ref, set } from 'firebase/database';


export default function Data() {
    const { setThemeData, setCurrentTheme, setShowComponent, setSelectedData, data, setData, user } = useContext(ResumeContext);
    const navigate = useNavigate();
    const [contextMenu, setContextMenu] = useState({ position: null, data: null });
    const color = useColorModeValue('gray.800', 'white');

    useEffect(() => {
        document.title = 'Data - Resume Lab';
    }, []);

    const showTheme = (e) => {
        setShowComponent(true);
        setThemeData(data[e.target.id].data);
        setCurrentTheme(data[e.target.id].theme);
        setSelectedData(e.target.id);
        navigate('/');
    };

    const handleRightClick = (e, index) => {
        e.preventDefault();
        setContextMenu({
            position: { x: e.clientX, y: e.clientY },
            data: e.target.id,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu({ position: null, data: null });
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (contextMenu.position) {
                handleCloseContextMenu();
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [contextMenu]);

    const handleRename = (id) => {
        const newName = prompt('Enter new name');
        if (newName) {
            setData((prevData) => {
                const newData = { ...prevData };
                newData[id].name = newName;
                return newData;
            });
            set(ref(getDatabase(), 'users/' + user.uid + '/Data/' + id + '/name'), newName);
        }
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            setData((prevData) => {
                const newData = { ...prevData };
                delete newData[id];
                return newData;
            });
            const db = getDatabase();
            remove(ref(db, 'users/' + user.uid + '/Data/' + id));
        }
    }

    const menuItems = [
        { label: 'Rename', onClick: (e) => {
            handleRename(contextMenu.data);
        } },
        { label: 'Delete', onClick: () => {
            handleDelete(contextMenu.data);
        }},
    ];

    return (
        <>
            <Box maxW={{ base: '100%', md: '61%' }} className="templatesList">
                {data && Object.keys(data).map((i, index) => {
                    const item = ThemeTemplateData.filter(item => item.id === data[i].theme)[0];
                    return (
                        <div key={index}>
                            <div
                                className="template"
                                onClick={showTheme}
                                onContextMenu={(e) => handleRightClick(e, index)}
                            >
                                <img id={i} src={item.imageSrc} alt={item.imageAlt} />
                            </div>
                            <div className="text">
                                <chakra.h3 color={color}>{data[i].name}</chakra.h3>
                            </div>
                        </div>
                    );
                })}
            </Box>
            <ContextMenu
                menuItems={menuItems}
                position={contextMenu.position}
                onClose={handleCloseContextMenu}
                bgcolor={useColorModeValue('white', 'gray.800')}
                color={color}
            />
        </>
    );
}
