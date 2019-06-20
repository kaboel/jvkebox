<template>
    <div id="songs">
        <v-flex md6 offset-md3>
            <Panel title="Songs">
                <div style="text-align: center" class="pt-3 pb-3" v-show="songs.length === 0">
                    No song to display.
                </div>

                <div :key="song.id" v-for="song in songs">
                    {{ song.id }} -
                    {{ song.title }} -
                    {{ song.artist }} -
                    {{ song.album }}
                </div>
            </Panel>

            <v-alert :value="alert.value"
                     :type="alert.type"
                     transition="scale-transition">
                {{ this.alert.msg }}
            </v-alert>
        </v-flex>
    </div>
</template>

<script>
    import Panel from "./helpers/Panel";
    import SongsService from "../services/SongsService";
    export default {
        name: 'songs',
        components: {Panel},
        data() {
            return {
                songs: [],
                alert: {
                    value: false,
                    type: null,
                    msg: null
                }
            }
        },
        mounted() {
            this.loadSongs();
        },
        methods: {
            alertOpen(type, msg) {
                this.alert = {
                    value: true,
                    type: type,
                    msg: msg
                };
            },
            async loadSongs() {
                await SongsService.loadSongs()
                    .then(songs => {
                        this.songs = songs.data;
                    })
                    .catch(err => {
                        this.alertOpen('error', err.response.data.error);
                    })
            }
        }
    }
</script>

<style scoped>
</style>
