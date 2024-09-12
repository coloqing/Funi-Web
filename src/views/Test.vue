<template>
    <div style="height: 100%;color: white !important; transform: scale(1); display: flex;align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;">
        <MyCharts :width="1000" :height="300" :option="bar_option"></MyCharts>

        <MyCharts :width="1000" :height="300" :option="line_option"></MyCharts>

        <MyCharts :width="300" :height="500" :option="pie_option"></MyCharts>
    </div>

</template>

<script>
import MyCharts from '@/components/MyCharts.vue';
export default {
    components: {
        MyCharts
    },
    data() {
        return {
            bar_option: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            },
            line_option: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }
                ]
            },
            pie_option: {
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: [40, 90],
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 1,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }
    }
}
</script>