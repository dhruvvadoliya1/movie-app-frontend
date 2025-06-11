import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    private capitalizeSentence(text: string): string {
        if (!text) return '';
        return text
            .split('. ')
            .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
            .join('. ');
    }

    handleError(error: any) {
        console.error('Error:', error);

        let errorMessage = 'An unexpected error occurred';

        // Handle Axios error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            errorMessage = error.response.data?.message || error.response.data?.data || error.response.data?.error || error.message;
        } else if (error.request) {
            // The request was made but no response was received
            errorMessage = 'No response received from server';
        } else if (error.message) {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
        }

        // Capitalize the error message
        errorMessage = this.capitalizeSentence(errorMessage);

        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: errorMessage,
            showConfirmButton: false,
            timer: 1500
        });
    }
} 