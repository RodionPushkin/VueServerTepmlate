import {createStore} from 'vuex'
import apiModule from '../api'
const api = new apiModule('/api/')
export default createStore({
    state: {
        isFirstLoad: true,
        user: undefined
    },
    getters: {
        ISFIRSTLOAD: state => {
            return state.isFirstLoad
        },
        USER: state => {
            return state.user
        }
    },
    mutations: {
        SET_IS_FIRST_LOAD: (state, payload) => {
            state.isFirstLoad = payload
        },
        LOAD_USER: (state,payload) => {
            api.get(`user`).then(r => r).then(res=>{
                state.user = res
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    actions: {
        SET_IS_FIRST_LOAD: (context, payload) => {
            context.commit('SET_IS_FIRST_LOAD', payload);
        },
        LOAD_USER: (context, payload) => {
            context.commit('LOAD_USER', payload);
        }
    },
    modules: {}
})
