<template>
    <div :class="`form-field ${row}`">
        <Multiselect v-model="value" :mode="mode" :options="options" :canClear="canClear" :placeholder="placeholder"
            :canDeselect="false" :classes="{
                container: `multiselect ${verbose}`,
                containerActive: `is-active ${verbose}-active`,
                tag: `multiselect-tag tag-${tag_color}`,
                option: `multiselect-option tag-${tag_color}`,
                dropdown: `multiselect-dropdown ${dropdown_gap}-gap`,
                tagsSearchWrapper: `multiselect-tags-search-wrapper hidden`
            }" @select="$emit('select',$event)">
            <!-- <template v-slot:caret="{}">
                <div :class="[
                    'multiselect-caret-custom',
                    caret_up
                        ? 'ar-up ar-down-anime'
                        : 'ar-down ar-up-anime'
                ]">
                    <UtilsSVGLoader
                        name="caret"
                        :size="caret_size"
                        color="#0A1F44"
                    />
                </div>
            </template> -->

            <template v-slot:tag="{ option, handleTagRemove }">
                <span :class="`multiselect-tag tag-${tag_color}`">
                    <span class="multiselect-tag-elipsis">
                        {{ option.value }}
                    </span>
                    <span class="multiselect-tag-remove" @click="handleTagRemove(option, $event)">
                        <span class="multiselect-tag-remove-icon">
                        </span>
                    </span>
                </span>
            </template>

            <template v-slot:option="{ option }">
                <span class="multiselect-option-text">{{ option.value.replace(/\//g, " / ") }}</span>
            </template>

            <template v-slot:placeholder="{}">
                <div class="multiselect-placeholder">
                    <span class="multiselect-placeholder-text">{{ placeholder }}</span>
                </div>
            </template>
        </Multiselect>
    </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { useField } from 'vee-validate';
import { defineComponent, watch, computed } from 'vue';

export default defineComponent({
    components: {
        Multiselect,
    },
    props: {
        id: { type: String, required: true },
        row: { type: String, required: true },
        mode: { type: String, required: true },
        options: { type: Array, required: true },
        selected: { type: Number, required: false, default: null },
        canClear: { type: Boolean, required: false, default: false },
        placeholder: { type: String, required: false, default: "Choisissez une option" },

        verbose: { type: String, required: false },
        tag_color: { type: String, required: false },
        caret_size: { type: String, required: false, default: "16px" },
        caret_up: { type: Boolean, required: false },
        dropdown_gap: { type: String, required: false, default: "small" },
    },
    emits: ["select"],
    setup(props) {
        const mode = computed(() => props.mode);
        const options = computed(() => props.options);
        const selected = computed(() => props.selected);

        const { value, handleChange } = useField(props.id, null, {
            validateOnValueUpdate: true,
        })

        if (mode.value === "single") {
            handleChange(options.value[selected.value - 1], true);
        }

        watch(value, (value, previous) => {
            if (mode.value === "single" && value === null) {
                handleChange(previous, true);
            }
        })

        return {
            value,
        }
    }
})
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>

<style lang="scss" scoped>
div>#app>.hidden {
    display: none !important;
}

.form-field {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &.single {
        width: 75%;
    }

    &.double {
        width: 50%;
    }

    &.double-no-gap {
        width: 48%;
    }
}

.multiselect-placeholder {
    width: 100% !important;
    position: relative !important;
    padding-right: unset !important;
}
</style>