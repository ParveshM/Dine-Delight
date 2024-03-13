export interface NewTableInterface {
  tableNumber: string;
  capacity: number;
  location: "In" | "Out";
}

export interface allotTableSlotInterface {
  tableId: string;
  slotDate: Date;
  startTime: string;
  endTime: string;
}

export interface TimeSlotDataInterface {
  startTime: string;
  endTime: string;
}
