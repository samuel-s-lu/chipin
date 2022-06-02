import React, { Component, Fragment } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import ExpandedCard from './ExpandedCard.js';
import { getDocInfo } from "../utils/firebase.js";



class MyCard extends Component {
    static propTypes = {
        eventName: PropTypes.instanceOf(String),
        eventLocation: PropTypes.instanceOf(String),
        eventDate: PropTypes.instanceOf(String)
    };

    static defaultProps = {
        eventName: "",
        eventLocation: "",
        eventDate: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            showComponent: false
        };
    }


    onClick = () => {
        if (this.state.showComponent) {
            this.setState({ showComponent: false });
        }
        else {
            this.setState({ showComponent: true });
        }
        console.log("clicked");

        this.props.handleCardClick(this.props.eventName)
    }

    getImage = async () => {
        let img = await getDocInfo("events", "YpmLG6e0XSnWbH0aSYsJ", "banner")
    }


    render() {
        const { alpha } = "test";
        const { eventName, eventMap, register } = this.props;
        const eventDate = eventMap[eventName].date;
        const eventLocation = eventMap[eventName].address;
        const eventImage = eventMap[eventName].banner;


        if (!this.state.showComponent) {
            return (
                <div style={{ paddingBottom: "10px" }} onClick={this.onClick}>
                    <Card sx={{
                        width: 250,
                        height: 210,
                        backgroundColor: "#D2D2D2",
                        borderRadius: 3,
                        display: 'flex',
                        display: 'inline-flex',
                        flexDirection: 'column',
                        positon: 'absolute',

                    }}>

                        <div>
                            <CardMedia
                                component="img"
                                width="10"
                                image={eventImage}
                                alt="green iguana"
                                className="mycard-img"
                            />
                        </div>
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" color="black" fontSize="18px">
                                        <b>{eventName}</b>
                                    </Typography>

                                    <Typography variant="body2" color="black" maxWidth={100} fontSize="10px">
                                        Date: {eventDate}
                                    </Typography>
                                    <Typography variant="body2" color="black" maxWidth={200} fontSize="10px">
                                        Location: {eventLocation}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </div>
                    </Card>
                </div>
            );
        }
        else {
            return (
                <div style={{ marginRight: 5, marginTop: 2 }}><ExpandedCard event={eventMap[eventName]} showCard={this.onClick} register={register} /> </div>
            );
        }
    }
}

export default MyCard