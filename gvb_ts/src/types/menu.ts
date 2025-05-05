import type { Component } from 'vue';

export interface MenuItem {
    key: string;
    title: string;
    icon?: Component;
    name?: string;
    children?: MenuItem[];
    // 可根据需要添加更多字段
    // 例如：permissions?: string[];
}
