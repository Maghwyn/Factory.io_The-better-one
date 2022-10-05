import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';

const instanceI18n = createI18n({
	locale: 'fr-FR',
	messages
})

export default instanceI18n;

// Work around to make i18n work for pinia swal
export const i18n = instanceI18n.global;