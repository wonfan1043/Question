<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);
export default {
    data() {
        return {
            option: {
                title: {
                    text: 'Traffic Sources',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
                },
                backgroundColor: "#abd8cc",
                series: [
                    {
                        name: 'Traffic Sources',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 500, name: 'Direct', itemStyle: { color: '#FA7070' } },
                            { value: 500, name: 'Email', itemStyle: { color: '#9195F6' }  },
                            { value: 500, name: 'Ad Networks', itemStyle: { color: '#2D9596' } },
                            { value: 500, name: 'Video Ads', itemStyle: { color: '#FF9800' }  },
                            { value: 500, name: 'Search Engines' },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            }
        }
    },
    components: {
        VChart,
    },
    provide: {
        [THEME_KEY]: 'light',
    },
}
</script>

<template>
    <v-chart class="chart" :option="option" autoresize />
</template>

<style lang="scss" scoped>
.chart {
    width: 50dvw;
    height: 30dvh;
}
</style>