import Api from './Api';

export default {
    loadSongs() {
        return Api().get('/songs');
    },
    addSong(song) {
        return Api().post('/songs', song);
    },
    updateSong(id, song) {
        return Api().patch('/song/update', id, song);
    },
    deleteSong(id) {
        return Api().delete('/song/delete', id);
    },
    showSong(id) {
          return Api().get('/song', id);
    }
}
