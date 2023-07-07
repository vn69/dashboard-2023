<template>
  <div class="grid p-3">
    <div class="col-12 md:col-6">
      <Card>
          <template #title> Simple Card </template>
          <template #content>
              <div v-for="giai in loto" :key="giai">
                <div class="flex">
                    <b class="loto-giai">{{giai.name}}: </b>
                    <div class="flex w-full justify-content-evenly">
                      <b v-for="(num, index) in giai.numbers" :key="index" class="loto-item">{{num}}</b>
                    </div> 
                </div>
                <Divider />
              </div>
          </template>
      </Card>
    </div>
    <div class="col-12 md:col-6">
      <Card>
          <template #title> Simple Card </template>
          <template #content>
            <Button :loading="loading" label="Quay" @click="getNewLoto"/>
            <Button label="skip 5 năm" class="ml-2"/>
            <Button label="Lô tô" class="ml-2" @click="showSelectLoto = true"/>

            <div class="info mt-2">
              <p>
                  Tuổi: {{age}}
              </p>
              <p>
                  Số tiền bạn kiếm được: 1đ
              </p>
              <p>
                  Số tiền người khác kiếm được: 1đ
              </p>
            </div>
          </template>
      </Card>
    </div>
  </div>

  <Dialog v-model:visible="showGameOver" modal header="Game Over" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
      <p>
          Bạn đã quá tuổi để đi làm, đến tuổi nghỉ hưu.
      </p>
      <p>
          Số tiền bạn kiếm được: 1đ
      </p>
      <p>
          Số tiền người khác kiếm được: 1đ
      </p>
      <template #footer>
          <Button label="Chơi lại" icon="pi pi-check" @click="resetGame" autofocus />
      </template>
  </Dialog>

  <SelectLoto v-model:visible="showSelectLoto" @submit="onSubmitLoto"></SelectLoto>
</template>

<script setup lang="ts">
import {lotoItem, selectNumber} from "./types"

const rawLoto: lotoItem[] = [
  {
    name: "ĐB",
    numbers: ['']
  },
  {
    name: "1",
    numbers: ['']
  },
  {
    name: "2",
    numbers: ['', '']
  },
  {
    name: "3",
    numbers: ["", "", "", "", "", ""],
  },
  {
    name: "4",
    numbers: ["","","",""]
  },
  {
    name: "5",
    numbers: ["", "", "", "", "", ""],
  },
  {
    name: "6",
    numbers: ["","",""]
  },
  {
    name: "7",
    numbers: ["","","","", "", ""]
  },
]
import _ from "lodash"
import { computed, reactive, ref, watch } from "vue";
import SelectLoto from "./components/SelectLoto.vue"

const loto = ref<lotoItem[]>(_.cloneDeep(rawLoto))
const waitingTime = 100
const loading = ref<boolean>(false)
const yourMoney = ref<number>(10000000)
const otherMoney = ref<number>(0)
const ageDay = ref<number>(18*365)
const showGameOver = ref<boolean>(false)
const showSelectLoto = ref<boolean>(false)

const timeout = async (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

const age = computed((): number => {
  return Math.floor(ageDay.value/365)
})

const resetGame = () => {
  yourMoney.value = 0
  otherMoney.value = 0
  ageDay.value = 18*365
  loto.value = _.cloneDeep(rawLoto)
  showGameOver.value = false
}

const getNewLoto = async () => {
  loading.value = true;

  loto.value = _.cloneDeep(rawLoto)
  const giai1 = loto.value.find(e => e.name == "1")
  await timeout(waitingTime)
  giai1.numbers[0] = getNumber(0, 99999)

  const giai2 = loto.value.find(e => e.name == "2")
  for (let i = 0; i < 2; i++) {
    await timeout(waitingTime)
    giai2.numbers[i] = getNumber(0, 99999)

  }

  const giai3 = loto.value.find(e => e.name == "3")
  for (let i = 0; i < 6; i++) {
    await timeout(waitingTime)
    giai3.numbers[i] = getNumber(0, 99999)
  }

  const giai4 = loto.value.find(e => e.name == "4")
  for (let i = 0; i < 4; i++) {
    await timeout(waitingTime)
    giai4.numbers[i] = getNumber(0, 9999)
  }
  const giai5 = loto.value.find(e => e.name == "5")
  for (let i = 0; i < 6; i++) {
    await timeout(waitingTime)
    giai5.numbers[i] = getNumber(0, 9999)

  }
  const giai6 = loto.value.find(e => e.name == "6")
  for (let i = 0; i < 3; i++) {
    await timeout(waitingTime)
    giai6.numbers[i] = getNumber(0, 999)

  }
  const giai7 = loto.value.find(e => e.name == "7")
  for (let i = 0; i < 6; i++) {
    await timeout(waitingTime)
    giai7.numbers[i] = getNumber(0, 99)
  }
  const db = loto.value.find(e => e.name == "ĐB")
  await timeout(waitingTime)
  db.numbers[0] = getNumber(0, 99999)

  loading.value = false
}

const getNumber = (min: number, max: number): string => {
  const len: number = max.toString().length
  let numStr: string = getRandomInt(min, max).toString()
  while (numStr.length < len) {
    numStr = '0' + numStr
  }
  return numStr.slice(-len)

}

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const onSubmitLoto = (list: selectNumber[]) => {
  console.log(list);
}

</script>

<style lang="scss" scoped>
.loto-item {
  min-width: 50px;
  text-align: right;
}
.loto-giai {
  min-width: 50px;
}
</style>