import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";

import type { Engine } from "tsparticles-engine";

export const loadParticles = async (engine: Engine) => {
	await loadBaseMover(engine);
	await loadCircleShape(engine);
	await loadOpacityUpdater(engine);
	await loadColorUpdater(engine);
};
