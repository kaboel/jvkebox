import Api from './Api';

export default {
    loadSongs() {
        return Api().get(`/songs`);
    },
    addSong(song) {
        return Api().post(`/songs`, song);
    },
    showSong(id) {
        return Api().get(`/songs/${id}`);
    },
    updateSong(id, song) {
        return Api().put(`/songs/${id}`, song);
    },
    deleteSong(id) {
        return Api().delete(`/song/delete`, id);
    }
}
