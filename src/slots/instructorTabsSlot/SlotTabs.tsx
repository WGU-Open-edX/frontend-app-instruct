import { DefaultSlotLayout, SlotContext, useSlotOperations } from "@openedx/frontend-base";
import { Tab, Tabs } from "@openedx/paragon";
import React, { cloneElement } from "react";
import { ComponentType, createElement, isValidElement, ReactNode } from "react";


interface SlotProps {
  id: string,
  children?: ReactNode,
  layout?: ComponentType | ReactNode,
  [key: string]: unknown,
}
//Move this into openedx/frontend-base if is approved
export default function SlotTabs({ id, children, layout = DefaultSlotLayout, ...props }: SlotProps) {
   const widgets = useSlotOperations(id);
   if (widgets.length === 0) return null;
   return (
        <SlotContext.Provider value={{ id, children, ...props }}>
            <Tabs id="instructor-tabs">
                {widgets.filter((widget:any) => widget.component).map((widget:any, index: number) => {
                    const element = widget.component();
                    return React.cloneElement(element, { key: element.key || index });
                })}
            </Tabs>
        </SlotContext.Provider>
    );

}