import React from 'react';
import { Box, List, ListItem} from '@chakra-ui/react';

const ContextMenu = ({ menuItems, position, onClose, bgcolor, color }) => {
    if (!position) return null;

    return (
    <Box
        position="absolute"
        top={position.y}
        left={position.x}
        bg={bgcolor}
        color={color}
        boxShadow="md"
        borderRadius="md"
        zIndex={1000}
        onClick={onClose}
    >
    <List spacing={1}>
        {menuItems.map((item, index) => (
        <ListItem key={index} padding={2} _hover={{ bg: bgcolor, cursor: 'pointer', color: color }} onClick={item.onClick}>
            {item.label}
        </ListItem>
        ))}
    </List>
    </Box>
    );
};

export default ContextMenu;
