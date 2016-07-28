jest.unmock('./../ticket');

import axios from 'axios';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import * as ticketActions from './../ticket';
import * as ticketTypes from './../../constants/ticket';
import {initialState} from './../../reducers/ticket';
import {getAPIUrl} from './../../../utilities/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ticket actions', () => {
    it('should return action to add ticket', () => {
        const text = 'Super ticket';
        const expectedAction = {
            type: ticketTypes.ADD,
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
            type: ticketTypes.UPDATE,
            payload: myTicket
        }

        expect(ticketActions.updateTicket(myTicket)).toEqual(expectedAction);
    });

    it('should return action to delete ticket', () => {
        const ticketId = 47234;
        const expectedAction = {
            type: ticketTypes.DELETE,
            payload: ticketId
        }

        expect(ticketActions.deleteTicket(ticketId)).toEqual(expectedAction);
    });

    describe('fetchTickets async action', () => {
        it('should return actions fetch pending and fulfilled', () => {
            const store = mockStore({
                tickets: initialState
            });

            const response = {
                tickets: [{
                    id: 1,
                    title: 'My Super Ticket'
                }]
            };

            const axiosAdapter = new AxiosMockAdapter(axios);

            axiosAdapter.onGet(getAPIUrl('/tickets')).reply(200, response);

            const now = moment();
            const nowThunk = () => now;

            const expectedActions = [{
                type: ticketTypes.FETCH_PENDING
            },{
                type: ticketTypes.FETCH_FULFILLED,
                payload: response,
                fetchedAt: nowThunk()
            }];

            return store.dispatch(
                ticketActions.fetchTickets({}, nowThunk)
            ).then(() => {
                expect(
                    store.getActions()
                ).toEqual(expectedActions);
            });
        });

        it('should return actions fetch pending and rejected', () => {
            const store = mockStore({
                tickets: initialState
            });

            const axiosAdapter = new AxiosMockAdapter(axios);

            axiosAdapter.onGet(getAPIUrl('/tickets')).reply(500, {});

            const expectedActions = [{
                type: ticketTypes.FETCH_PENDING
            },{
                type: ticketTypes.FETCH_REJECTED,
                payload: {}
            }];

            return store.dispatch(
                ticketActions.fetchTickets({}, () => null)
            ).catch(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('should not return any action', () => {
            const store = mockStore({
                tickets: {
                    ...initialState,
                    isFetching: true
                }
            });
            
            const expectedActions = [];

            return store.dispatch(
                ticketActions.fetchTickets({}, () => null)
            ).catch(() => {
                expect(
                    store.getActions()
                ).toEqual(expectedActions);
            });
        })
    });

});
