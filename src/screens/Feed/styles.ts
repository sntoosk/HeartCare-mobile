import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e61919',
  },
  commentContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  postContainer: {
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  actionIconContainer: {
    marginRight: 10,
  },
  saveIconContainer: {
    alignSelf: 'flex-end',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: 5,
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
});