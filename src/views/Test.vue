<template>
    <div style="height: 35vh;width: 33vw;color: white !important; margin: auto; padding-top: 30vh;">
        <SignalCom :signal_name="'A1-充电机输出电流传感器BC11'" signal_value="50A" :color="'#ac3577'"> </SignalCom>
    </div>

</template>

<script>
import SignalCom from '@/components/SignalCom.vue';
export default {
    components: {
        SignalCom
    },
    data() {
        return {

        }
    }
}
</script>