<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center bg-success">
    <router-link :to="{ name: 'Bugs' }" class="nav-link">
    </router-link>
    <!-- <router-link :to="{ name: 'BugsPage' }" class="nav-link">
      <button type="button" class="btn btn-primary">
        Bugs Page
      </button>
    </router-link> -->
    <!-- <router-link :to="{ name: 'BugDetails' }" class="nav-link">
      <button type="button" class="btn btn-primary">
        Bug Details
      </button>
    </router-link> -->
    <h1>
      Welcome to Bugfinder!
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Bugs'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    width: 800px;
  }
}
</style>
