import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const data = [
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' },
  { id: '4', text: 'Item 4' },
  { id: '5', text: 'Item 5' },
  { id: '6', text: 'Item 6' },
];

const Cases = () => {
  const [items, setItems] = useState({
    column1: data.slice(0, 2),
    column2: data.slice(2, 4),
    column3: data.slice(4, 6),
  });

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <View style={[styles.itemContainer, isActive && styles.activeItem]}>
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    );
  };

  const onDragEnd = (newData) => {
    setItems({
      column1: newData.slice(0, 2),
      column2: newData.slice(2, 4),
      column3: newData.slice(4, 6),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>Column 1</Text>
        <DraggableFlatList
          data={items.column1}
          renderItem={renderItem}
          onDragEnd={onDragEnd}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>Column 2</Text>
        <DraggableFlatList
          data={items.column2}
          renderItem={renderItem}
          onDragEnd={onDragEnd}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>Column 3</Text>
        <DraggableFlatList
          data={items.column3}
          renderItem={renderItem}
          onDragEnd={onDragEnd}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  activeItem: {
    backgroundColor: '#d9d9d9',
  },
});

export default Cases;
