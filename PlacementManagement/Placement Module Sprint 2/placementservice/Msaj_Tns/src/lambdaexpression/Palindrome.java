//Program to define generic functional interface Palindrome

package lambdaexpression;

public interface Palindrome<T> {
	boolean checkPalindrome(T data);
}
