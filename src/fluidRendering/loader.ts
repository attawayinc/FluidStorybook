/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ContainerRuntimeFactoryWithDefaultDataStore } from '@fluidframework/aqueduct';
import { IProxyLoaderFactory } from "@fluidframework/container-definitions";
import { Loader, Container } from '@fluidframework/container-loader';

import { getDocumentServiceFactory } from "./multiDocumentServiceFactory";
import { MultiUrlResolver } from "./multiResolver";
import { StorybookCodeLoader } from './storybookCodeLoader';

export interface ILocalRouteOptions {
    mode: "local";
}

export interface ITinyliciousRouteOptions {
    mode: "tinylicious";
}

export type RouteOptions =
    | ILocalRouteOptions
    | ITinyliciousRouteOptions;

export async function getLoader(
    fluidExport: ContainerRuntimeFactoryWithDefaultDataStore,
    documentId: string,
    options: RouteOptions,
) {
    const urlResolver = new MultiUrlResolver(window.location.origin, documentId, options);

    const codeLoader = new StorybookCodeLoader(fluidExport);
    const documentServiceFactory = getDocumentServiceFactory(documentId, options);
    const loader = new Loader(
        urlResolver,
        documentServiceFactory,
        codeLoader,
        { blockUpdateMarkers: true },
        {},
        new Map<string, IProxyLoaderFactory>());

    return { loader, urlResolver };
}

export async function getFluidObject(container: Container, objectUrl: string) {
    const response = await container.request({
        headers: {
            mountableView: true,
        },
        url: objectUrl, // Local data object name
    });

    if (response.status !== 200 || !(response.mimeType === "fluid/object")) {
        throw new Error(`Could not load Fluid object ${objectUrl}`);
    }

    return response.value;
}