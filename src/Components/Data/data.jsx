import React, { useContext, useEffect, useState } from 'react';
import ThemeTemplateData from '../../db/ThemeTemplateData';
import ResumeContext from '../../Context/ResumeContext';
import { Box, useColorModeValue, chakra } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ContextMenu from './ContextMenu';
import { remove, getDatabase, ref, set } from 'firebase/database';
import BuilderArea from '../../Pages/BuilderArea';
import Theme1 from './../../Theme/Theme1/Theme1'
import Theme2 from './../../Theme/Theme2/Theme2'
import Theme3 from './../../Theme/Theme3/Theme3'
import { useReactToPrint } from 'react-to-print';
import { push } from 'firebase/database';


export default function Data() {
    const { setThemeData, currentTheme, setCurrentTheme, setShowComponent, selectedData, setLoading, setUser, setSelectedData, data, setData, user, componentRef, themeData, checkAward, setCheckAward, checkProj, checkWork, setCheckProj, setCheckWork } = useContext(ResumeContext);
    const navigate = useNavigate();
    const [contextMenu, setContextMenu] = useState({ position: null, data: null });
    const [download, setDownload] = useState(false);
    const color = useColorModeValue('gray.800', 'white');

    useEffect(() => {
        document.title = 'Data - Resume Lab';
    }, []);

    function showTheme(e){
        setShowComponent(true);
        setThemeData(data[e.target.id].data);
        setCurrentTheme(data[e.target.id].theme);
        setSelectedData(e.target.id);
        setCheckAward(data[e.target.id].checkAward);
        setCheckProj(data[e.target.id].checkProj);
        setCheckWork(data[e.target.id].checkWork);
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

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforePrint: () => {
            setLoading(true)
        },
        onAfterPrint: () => {
            setLoading(false)
            const db = getDatabase();
            if(selectedData === null){
                push(ref(db, 'users/' + user.uid + '/Data'), {
                    name: user.name + ' ' + user.data_length,
                    theme: currentTheme,
                    data: themeData,
                    checkAward: checkAward,
                    checkProj: checkProj,
                    checkWork: checkWork
                }).then(
                    setUser({...user, data_length: user.data_length + 1})
                ).catch((error) => {
                    console.error(error);
                });
                setData({...data, [user.data_length]: {name:data[selectedData].name, theme: currentTheme, data: themeData}})
            } else{
                set(ref(db, 'users/' + user.uid + '/Data/' + selectedData), {
                    name: data[selectedData].name,
                    theme: currentTheme,
                    data: themeData,
                    checkAward: checkAward,
                    checkProj: checkProj,
                    checkWork: checkWork
                }).catch((error) => {
                    console.error(error);
                });
                setData({...data, [selectedData]: {name:data[selectedData].name, theme: currentTheme, data: themeData}})
            }
            setSelectedData(null);
            setDownload(false);
        }
    });

    useEffect(() => {
        if (download) {
            handlePrint();
        }
    }, [download, handlePrint]);

    const handleDownload = (id) => {
        setCurrentTheme(data[id].theme);
        setThemeData(data[id].data);
        setCheckAward(data[id].checkAward);
        setCheckProj(data[id].checkProj);
        setCheckWork(data[id].checkWork);
        setSelectedData(id);
        setDownload(true);
    }

    const menuItems = [
        { label: 'Rename', onClick: (e) => {
            handleRename(contextMenu.data);
        } },
        { label: 'Delete', onClick: () => {
            handleDelete(contextMenu.data);
        }},
        {
            label: 'Download', onClick: () => {
                handleDownload(contextMenu.data);
            }
        },
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
            {
                (currentTheme === 'Theme1') && 
                <div style={{display:'none'}}><BuilderArea theme={<Theme1 componentRef={componentRef} themeData={themeData} />} /></div>
            }
            {
                (currentTheme === 'Theme2') && 
                <div style={{display:'none'}}><BuilderArea theme={<Theme2 componentRef={componentRef} themeData={themeData} />} /></div>
            }
            {
                (currentTheme === 'Theme3') && <div style={{display:'none'}}><BuilderArea theme={<Theme3 componentRef={componentRef} themeData={themeData} />} /></div>
            }
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
