<template>
    <div id="addSong">
        <v-form ref="form" v-model="valid">
            <v-layout>
                <v-flex md4>
                    <Panel title="Song's Metadata" class="pt-4 pr-2 pl-4 pb-2">
                        <v-text-field v-model="song.title"
                                      color="purple darken-2"
                                      class="px-4 pt-3"
                                      label="Title"
                                      :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field v-model="song.artist"
                                      color="purple darken-2"
                                      class="px-4 pt-2"
                                      label="Artist"
                                      :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field v-model="song.album"
                                      color="purple darken-2"
                                      class="px-4 pt-2"
                                      label="Album"
                                      :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field v-model="song.albumImageUrl"
                                      color="purple darken-2"
                                      class="px-4 pt-2"
                                      label="Album Image Url"
                                      :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field v-model="song.youtubeId"
                                      color="purple darken-2"
                                      class="px-4 pt-2 pb-4"
                                      label="Youtube ID"
                                      :rules="[rules.required]"
                        ></v-text-field>
                    </Panel>
                </v-flex>

                <v-flex md8>
                    <Panel title="Song's Structure" class="pt-4 pr-4 pl-2 pb-2">
                        <v-textarea v-model="song.tab"
                                    color="purple darken-2"
                                    class="px-4 pt-4"
                                    label="Song Tab"
                        ></v-textarea>
                        <v-textarea v-model="song.lyrics"
                                    color="purple darken-2"
                                    class="px-4 pt-3 pb-4"
                                    label="Song Lyrics"
                        ></v-textarea>
                    </Panel>
                </v-flex>
            </v-layout>
        </v-form>
        <div class="buttons">
            <v-btn fab dark outline small color="red darken-4" @click="resetForm" title="Reset">
                <v-icon dark>undo</v-icon>
            </v-btn>
            <v-btn fab dark color="purple darken-4" @click="addSong" v-show="valid">
                <v-icon dark>add</v-icon>
            </v-btn>
        </div>

        <v-snackbar v-model="snackbar.display"
                    :timeout="snackbar.timeout"
                    bottom right>
            {{ snackbar.text }}
            <v-btn class="purple--text text--lighten-4"
                   @click="snackbar.display = false"
                   flat>
                Ok
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import Panel from "./helpers/Panel";
    import SongsService from "../services/SongsService";

    export default {
        name: 'addSong',
        components: {Panel},
        data() {
            return {
                valid: false,
                song: {
                    title: null,
                    artist: null,
                    genre: null,
                    album: null,
                    albumImageUrl: null,
                    youtubeId: null,
                    lyrics: null,
                    tab: null
                },
                rules: {
                    required: val => !!val || 'This field is required.',
                },
                snackbar: {
                    display: false,
                    timeout: 5000,
                    text: null
                }
            }
        },
        methods: {
            resetForm() {
                this.$refs.form.reset();
                this.$refs.form.resetValidation();
            },
            async addSong() {
                try {
                    await SongsService.addSong(this.song);
                    this.$router.push('/songs');
                } catch (err) {
                    this.snackbar = {
                        display: true,
                        text: `Failed to add new song - ${err.response.data.error}`
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .material-icons {
        display: inherit !important;
    }
    .buttons {
        text-align: center;
    }
</style>
