<template>
  <v-sheet class="Sheet">
    <v-icon size="50" class="Sheet__icon-info">
      info_outline
    </v-icon>
    <div class="Sheet__btns-wrapper-top">
      <v-btn
        depressed
        small
        width="100"
        color="primary white--text mb-2"
        @click="$emit('close')"
      >
        Close
        <v-icon right color="white">close</v-icon>
      </v-btn>
    </div>
    <div v-show="showActions" class="Sheet__btns-wrapper-bottom">
      <v-btn
        depressed
        small
        width="100"
        color="warning white--text mb-2"
        @click="
          $emit('showDialog', {
            dialog: 'form',
            action: 'edit',
            farm: selectedFarm
          })
        "
      >
        Edit
        <v-icon right color="white">edit</v-icon>
      </v-btn>
      <br />
      <v-btn
        depressed
        small
        width="100"
        color="error white--text"
        @click="
          $emit('showDialog', {
            dialog: 'form',
            action: 'delete',
            farm: selectedFarm
          })
        "
      >
        Delete
        <v-icon right color="white">delete</v-icon>
      </v-btn>
    </div>
    <div class="Sheet__container py-5 py-md-0 ma-auto">
      <v-simple-table dense>
        <template v-slot:default>
          <tbody>
            <template v-for="(val, key, index) in selectedFarm">
              <tr v-if="key !== 'image'" :key="index">
                <td>
                  <small class="font-weight-light text--secondary">
                    {{ labels[key] }}
                  </small>
                </td>
                <td>{{ val }}</td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-sheet>
</template>

<script>
export default {
  props: {
    selectedFarm: {
      type: Object,
      required: true
    },
    labels: {
      type: Object,
      required: true
    },
    showActions: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="scss">
.Sheet {
  height: 280px;
  position: relative;

  @media screen and (max-width: 960px) {
    height: 75vh;
  }
}

.Sheet__icon-info {
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.5;
}

.Sheet__btns-wrapper-top {
  position: absolute;
  top: 10px;
  right: 10px;
}

.Sheet__btns-wrapper-bottom {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.Sheet__container {
  max-width: 70vw;

  @media screen and (max-width: 960px) {
    max-width: 100%;
  }
}
</style>
