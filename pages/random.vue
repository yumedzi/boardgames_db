<template></template>

<script>
export default {
  mounted() {
    let randGame = this.$store.state.games.games[
      Math.floor(Math.random() * this.$store.state.games.games.length)
    ]
    console.log(`Random game selected, id: ${randGame.id}`)
    this.$router.push(`/game/${randGame.id}`)
  }
}
</script>
