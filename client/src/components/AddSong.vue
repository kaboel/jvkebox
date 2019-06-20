<template>
    <div id="addSong">
        <Panel title="Add Song">
            <v-form ref="form" v-model="valid">
                <v-layout>
                    <v-flex md4>
                        <Panel title="Song's Metadata" class="pt-4 pr-2 pl-4 pb-4">
                            <v-text-field
                                    color="purple darken-2"
                                    class="px-4 pt-4"
                                    type="email"


                                    label="Email Address"
                            ></v-text-field>
                        </Panel>
                    </v-flex>

                    <v-flex md8>
                        <Panel title="Song's Structure" class="pt-4 pr-4 pl-2 pb-4">

                        </Panel>
                    </v-flex>
                </v-layout>
            </v-form>
            <div class="buttons">
                <v-btn fab dark outline small color="red darken-4" class="">
                    <v-icon dark>undo</v-icon>
                </v-btn>
                <v-btn fab dark color="purple darken-4" class="">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </div>
        </Panel>
    </div>
</template>

<script>
    import Panel from "./helpers/Panel";
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
        text-align: right;
    }
</style>
