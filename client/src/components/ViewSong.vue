<template>
    <div id="song">
        <div>
            {{song.title}}
        </div>
    </div>
</template>
<script>
    import SongsService from "../services/SongsService";

    export default {
        name: 'viewSong',
        data() {
            return {
                song: null
            }
        },
        mounted() {
            this.loadSong(this.$route.params.id)
        },
        methods: {
            async loadSong(id) {
                await SongsService.showSong(id)
                    .then(song => {
                        this.$store.dispatch('setSong', song.data)
                            .then(() => {
                                this.song = this.$store.getters.getSong;
                            })
                            .catch(err => {
                                alert(err)
                        });
                    })
                    .catch(err => {
                        alert(err)
                    })
            }
        }
    }
</script>
<style></style>
