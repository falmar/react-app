jest.unmock('./../ticket');

import * as ticketActions from './../ticket';
import * as ticketTypes from './../../constants/ticket';

describe('ticket actions', () => {
    it('should return action to add ticket', () => {
        const text = 'Super ticket';
        const expectedAction = {
            type: ticketTypes.ADD_TICKET,
            payload: text
        }

        expect(ticketActions.addTicket(text)).toEqual(expectedAction);
    });

    it('should return action to update ticket', () => {
        const myTicket = {
            id: 3,
            title: 'Super Ticket 2.0'
        };

        const expectedAction = {
            type: ticketTypes.UPDATE_TICKET,
            payload: myTicket
        }

        expect(ticketActions.updateTicket(myTicket)).toEqual(expectedAction);
    });

    it('should return action to delete ticket', () => {
        const ticketId = 47234;
        const expectedAction = {
            type: ticketTypes.DELETE_TICKET,
            payload: ticketId
        }

        expect(ticketActions.deleteTicket(ticketId)).toEqual(expectedAction);
    });
});
