import React, { Component } from 'react';

class ContactData extends Component {
    state = {
        name: 'kek',
        deliveryMethod: 'DHL',
        phoneNumber: '08000000000', 
    };

    render() {
        return (
            <form>
                <input type="text" name="name" placeholder="Your name"/>
                <input type="text" name="phoneNumber" placeholder="Your phone number"/>
            </form>
        )
    }
}

export default ContactData;