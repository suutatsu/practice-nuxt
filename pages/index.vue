<template>
  <section class="container">
    <div>
      <h1 class="title">Practis-Todo</h1>
    </div>
    <PieChart
      :chart-source="lectureAllStatistics"
      :colors="['#009A4C', '#7CD971', '#D14B36']"
      :title="$t('domain.lectures.label.lecturesAll')"
      :width="180"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PieChart from '~/components/pieChart.vue'

@Component({
  components: {
    PieChart
  }
})
export default class extends Vue {
  get lectureAllStatistics(): { [s: string]: number } {
    return {
      ["20","15","10"]: number,
      2: number,
      10: number
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 100px 0 0;
  width: 700px;
  margin: 0 auto;
}
</style>
