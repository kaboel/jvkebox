import Api from './Api';

export default {
    loadSongs() {
        return Api().get('/songs');
    }
}
