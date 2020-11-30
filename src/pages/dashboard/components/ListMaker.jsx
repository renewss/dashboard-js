import React from 'react';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';

//

export default function ListMaker(props) {
    return (
        <List
            component="nav"
            aria-label="secondary mailbox folders"
            style={{ padding: '0', margin: '0' }}
        >
            {props.list.map((item) => (
                <React.Fragment key={item}>
                    <ListItem>
                        <ListItemText primary={item} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
}
