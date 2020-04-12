<template>
  <v-card outlined class="Card font-weight-medium mb-4 mx-2">
    <v-fab-transition>
      <div v-show="showActions" class="Card__actions">
        <v-btn
          color="warning"
          fab
          x-small
          class="mr-2"
          @click="$emit('showDialog', { dialog: 'form', action: 'edit', farm })"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          color="error"
          fab
          x-small
          @click="
            $emit('showDialog', {
              dialog: 'form',
              action: 'delete',
              farm
            })
          "
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </div>
    </v-fab-transition>
    <v-skeleton-loader
      v-if="farm.imageLoading"
      type="image"
      max-height="170px"
    />
    <v-img v-else :src="farm.imageLoaded" height="170px" />
    <v-card-text
      class="Card__content pb-2"
      @click="$emit('showDialog', { dialog: 'info', farm })"
    >
      <v-fab-transition>
        <div v-show="showActions" class="Card__icon-info">
          <v-icon>info_outline</v-icon>
        </div>
      </v-fab-transition>
      <h3 class="black--text mb-1">
        {{ farm.name }}
      </h3>
      <p class="mb-2">
        <small class="font-weight-light text--secondary">
          {{ labels["owner"] }}
        </small>
        {{ farm.owner }}
      </p>
      <small
        class="Card__coordinates d-inline-flex align-center text--secondary mb-0"
      >
        <v-icon small>room</v-icon>
        +{{ farm.lat }} -{{ farm.long }}
      </small>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    farm: {
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
.Card {
  width: 250px;

  @media screen and (max-width: 600px) {
    overflow: hidden;
    width: 100%;
  }
}

.Card__actions {
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 10;

  @media screen and (max-width: 600px) {
    top: 10px;
    right: 10px;
  }
}

.Card__content {
  cursor: pointer;
}

.Card__icon-info {
  position: absolute;
  top: 180px;
  right: 10px;
  z-index: 1;
}

.Card__coordinates {
  font-size: 0.8rem;
}
</style>
