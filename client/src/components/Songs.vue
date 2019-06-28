<template>
    <div id="songs">
        <v-flex md6 offset-md3>
            <Panel title="Songs">
                <div slot="actions">
                    <v-btn color="purple lighten-1" right fab absolute to="/song/add">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </div>

                <div style="text-align: center" class="pt-3 pb-3" v-show="songs.length === 0">
                    No song to display.
                </div>

                <div :key="song.id" v-for="song in songs" class="px-4 py-4">
                    <v-layout>
                        <v-flex md4>
                            <v-img :src="song.albumImageUrl"
                                   :lazy-src="song.albumImageUrl"
                                   aspect-ratio="1"
                                   class="purple darken-4"/>
                        </v-flex>
                        <v-flex class="pl-4">
                            <div class="song">
                                <p>{{ song.title }}</p>
                                <p>{{ song.album }}</p>
                                <p>By: <b>{{ song.artist }}</b></p>
                            </div>
                            <div class="actions">
                                <v-btn small fab class="red--cust" @click="play(song.id)">
                                    <v-icon class="white--text">play_arrow</v-icon>
                                </v-btn>
                                <v-btn small :to="{name: 'viewSong', params: {id: song.id}}">
                                    <v-icon>more_horiz</v-icon>
                                </v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
            </Panel>

            <v-alert :value="alert.value"
                     :type="alert.type"
                     transition="scale-transition">
                {{ this.alert.msg }}
            </v-alert>
        </v-flex>

        <v-dialog v-model="dialog.value"
                  width="768">
            <v-card>
                <v-card-title class="title grey lighten-2">
                    {{ dialog.title }}
                </v-card-title>

                <v-card-media class="px-4 py-3">
                    <iframe width="100%" height="405" v-bind:src="dialog.ytId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                </v-card-media>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="red"
                            flat
                            @click="dialog = false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
                },
                dialog: {
                    value: false,
                    title: null,
                    artist: null,
                    album: null,
                    ytId: null
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
            dialogOpen(song) {
                this.dialog = {
                    value: true,
                    title: song.title,
                    artist: song.artist,
                    album: song.album,
                    ytId: `https://www.youtube.com/embed/${song.youtubeId}`
                }
            },
            async loadSongs() {
                await SongsService.loadSongs()
                    .then(songs => {
                        this.songs = songs.data;
                    })
                    .catch(err => {
                        this.alertOpen('error', err.response.data.error);
                    })
            },
            async play(id) {
                await SongsService.showSong(id)
                    .then(song => {
                        this.dialogOpen(song.data);
                        // alert(song.data.youtubeId);
                    })
                    .catch(err => {
                        this.alertOpen('error', err.response.data.error);
                    });
            }
        }
    }
</script>

<style scoped>
    .song p:first-child {
        font-size: 2rem;
        font-weight: bolder;
    }
    .song p:nth-of-type(even) {
        font-size: 1.2rem;
        margin-top: -1.5rem;
    }
    .song p:last-child {
        font-size: 1.1rem;
        margin-top: -.7rem;
    }
    .red--cust {
        background-color: #ff0000 !important;
    }
</style>
